import cp from 'child_process';

export class SoundCloud {
	constructor() {}

	guard(url = '', outputFolder = ''): void | Error {
		if (outputFolder.charAt(0) === '~') {
			// path must be absolute for spawn to work.
			throw new Error('You must use absolute path');
		}

		if (!url.includes('soundcloud')) {
			throw new Error('Wrong url ?');
		}
	}

	download(url = '', outputFolder = ''): cp.ChildProcessWithoutNullStreams | Error {
		this.guard(url, outputFolder);

		return cp.spawn('scdl', ['-l', url, '--path', `${outputFolder}`, '-c']);
	}

	downloadAll(url = '', outputFolder = '', user = ''): cp.ChildProcessWithoutNullStreams | Error {
		this.guard(url, outputFolder);

		return cp.spawn('scdl', ['-a', url, '--path', `${outputFolder}`, user, '-c']);
	}

	downloadPlaylist(url = '', outputFolder = '', user = ''): cp.ChildProcessWithoutNullStreams | Error {
		this.guard(url, outputFolder);

		return cp.spawn('scdl', [url, '--path', `${outputFolder}`, user, '-c', '-p']);
	}
}
