//Persistence Layer (async, backed by json-server)
const API_BASE =  'http://localhost:3000';
const STATE_URL = `${API_BASE}/state/1`;

async function loadState() {
    try {
        const res = await fetch(STATE_URL);
        if (!res.ok) {
            throw new Error(`Server returned ${res.status} while loading state.`);
        }
        const data = await res.json();
        console.log(data)

        return {
            categories: data.categories || [],
            transactions: data.transactions || [],
            version: typeof data.version === 'number' ? data.version : 1
        };
    } catch (err) {
        console.error('Failed to load saved ledger state:', err);
        return { categories: [], transactions: [], version: 1 };
    }
}

// Returns one of:
//   { ok: true, version }
//   { ok: false, conflict: true, serverVersion }
//   { ok: false }
//
// NOTE: the conflict check below is a GET followed by a PUT, not an atomic
// compare-and-swap. json-server does not support conditional writes
// (no ETag/If-Match), so there is still a narrow race window between the
// check and the write. This reduces the chance of silent overwrite; it
// does not eliminate it.
async function saveState(categories, transactions, expectedVersion) {
    try {
        const checkRes = await fetch(STATE_URL);
        if (checkRes.ok) {
            const current = await checkRes.json();
            const serverVersion = typeof current.version === 'number' ? current.version : 1;
            if (serverVersion !== expectedVersion) {
                return { ok: false, conflict: true, serverVersion };
            }
        }

        const nextVersion = expectedVersion + 1;
        const res = await fetch(STATE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1, categories, transactions, version: nextVersion })
        });
        if (!res.ok) {
            throw new Error(`Server returned ${res.status} while saving state.`);
        }
        return { ok: true, version: nextVersion };
    } catch (err) {
        console.error('Failed to persist ledger state:', err);
        return { ok: false };
    }
}

// Explicit destructive reset. Deliberately bypasses the version check above:
// "clear all data" is a user-confirmed action, not a background sync, so we
// force the overwrite rather than risk blocking it on an unrelated conflict.
async function resetState() {
    try {
        let nextVersion = 1;
        const checkRes = await fetch(STATE_URL);
        if (checkRes.ok) {
            const current = await checkRes.json();
            nextVersion = (typeof current.version === 'number' ? current.version : 1) + 1;
        }
        const res = await fetch(STATE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1, categories: [], transactions: [], version: nextVersion })
        });
        if (!res.ok) {
            throw new Error(`Server returned ${res.status} while resetting state.`);
        }
        return { ok: true, version: nextVersion };
    } catch (err) {
        console.error('Failed to reset ledger state:', err);
        return { ok: false };
    }
}