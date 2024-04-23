import {encoded, translations} from './data.js';

const ignoreFieldSet = new Set(['groupId', 'service', 'formatSize', 'ca']);
const uniqueIds = new Set();

function addUniqueId(id) {
    if (!id) {
        return;
    }

    uniqueIds.add(id);
}

function translate(item) {
    for (const key in item) {
        if (!ignoreFieldSet.has(key)) {
            const id = item[key];
            const translation = translations[id];
            if (translation === undefined) {
                addUniqueId(id);
            } else {
                item[key] = translation;
            }
        }
    }

    return item;
}

function decode(data) {
    if (!data || !Array.isArray(data)) {
        return;
    }

    return data.map(translate);
}

const decoded = decode(encoded);

// console.log('Let\'s rock');
// console.log(encoded, translations);
console.log(decoded);
console.log(uniqueIds);
