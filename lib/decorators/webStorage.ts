import {KeyStorageHelper, WebStorageHelper} from '../helpers/index';
import {STORAGE} from '../enums/storage';

export function WebStorage(webSKey:string, sType:STORAGE, defaultValue:any = null) {
	return function(targetedClass:Object, raw:string) {
		WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw, defaultValue);
	};
}

export function WebStorageDecorator(webSKey:string, sType:STORAGE, targetedClass:Object, raw:string, defaultValue:any = null) {
	let key = webSKey || raw;
	Object.defineProperty(targetedClass, raw, {
		get: function() {
			let sKey = KeyStorageHelper.genKey(key);
			return WebStorageHelper.retrieve(sType, sKey);
		},
		set: function(value) {
			let sKey = KeyStorageHelper.genKey(key);
			this[sKey] = value;
			WebStorageHelper.store(sType, sKey, value);
		}
	});

	if(targetedClass[raw] === null)
		targetedClass[raw] = defaultValue;
}
