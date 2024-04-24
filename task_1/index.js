import {encoded, translations} from './data.js';

function decode(data) {
    if (!data || !Array.isArray(data)) {
        return;
    }

    const ignoreFieldSet = new Set(['groupId', 'service', 'formatSize', 'ca']);
    const uniqueIdsMap = new Map();

    const addUniqueId = id => {
        if (!id) {
            return;
        }

        uniqueIdsMap.set(id, (uniqueIdsMap.get(id) ?? 0) + 1);
    };

    const translate = item => {
        for (const key in item) {
            if (!ignoreFieldSet.has(key)) {
                const id = item[key];
                const translation = translations[id];
                if (translation !== undefined) {
                    item[key] = translation;
                }
                addUniqueId(id);
            }
        }

        return item;
    };

    const decoded = data.map(translate);
    const unique = [...uniqueIdsMap.entries()].filter(([_, v]) => v === 1)
        .map(([k, _]) => k);

    return {
        decoded,
        unique
    };
}

const {decoded, unique} = decode(encoded);

// console.log('Let\'s rock');
// console.log(encoded, translations);
console.log(decoded);
console.log(unique);