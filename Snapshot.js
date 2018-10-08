class Snapshot {
	constructor( key, value, ref ) {
		this.key = key;
		this.value = value;
		this.ref = ref;
	}
	
	val() {
		return this.value;
	}
}

module.exports = Snapshot;