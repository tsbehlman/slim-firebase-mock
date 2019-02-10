class Snapshot {
	constructor( key, value, ref ) {
		this.key = key;
		this.value = value;
		this.ref = ref;
	}
	
	val() {
		return this.value;
	}
	
	exists() {
		return this.value !== undefined;
	}
}

module.exports = Snapshot;