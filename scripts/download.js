const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function hasPython3() {
	return new Promise((resolve, reject) => {
		cp.exec('python3 --version', (err, stdout, stderr) => {
			if (err) {
				reject(err);
			} else if (stderr) {
				reject(stderr);
			} else {
				resolve(stdout);
			}
		});
	});
}

function destinationDir() {
	return new Promise((resolve, reject) => {
		fs.mkdir(path.join(__dirname, 'bin'), err => {
			if (err) {
				reject(err);
			} else {
				resolve(true);
			}
		});
	});
}

function cloneAndInstall() {
	return new Promise((resolve, reject) => {
		const startFolder = `cd ${path.join(__dirname, 'bin')}`;
		const installScript = 'git clone https://github.com/flyingrub/scdl.git && cd scdl && python3 setup.py install';
		const command = `${startFolder} && ${installScript}`;
		cp.exec(command, (err, stdout, stderr) => {
			if (err) {
				reject(err);
			} else if (stderr) {
				reject(stderr);
			} else {
				resolve(stdout);
			}
		});
	});
}

function makeInstall() {
	hasPython3() // check if user has Python3
		.then(() => {
			destinationDir() // create DestFolder for binaries
				.then(() => {
					cloneAndInstall() // make the actual install
						.then(() => {
							console.info('scdl installed successfully');
						})
						.catch(e => new Error(e)); //TODO: handle case where install didn't success
				})
				.catch(e => new Error(e)); // TODO: handle case were destDir didn't created
		})
		.catch(e => new Error(e)); // TODO: handle case where people don't have python3
}

makeInstall();
