exports.fix_name = function (name) {
	if (name.match(/.*v/)){
		name[name.length - 1] = 'V';
	}
	else if (name.match(/.*vmax/)) {
		name[name.length - 4] = 'V';
		name[name.length - 3] = 'M';
		name[name.length - 2] = 'A';
		name[name.length - 1] = 'X';
	}
	return name;
};