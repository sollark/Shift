export const parseUserAgent = (userAgentString) => {
    const parsed = {
        browser: {
            name: '',
            version: '',
            major: '',
        },
        os: {
            name: '',
            version: '',
        },
    };
    // Browser
    const browserMatches = userAgentString.match(/^(.*)\/(.*)\s/);
    if (browserMatches) {
        parsed.browser = {
            name: browserMatches[1],
            version: browserMatches[2],
            major: browserMatches[2].split('.')[0],
        };
    }
    // OS
    if (userAgentString.indexOf('Windows') !== -1) {
        parsed.os.name = 'Windows';
    }
    else if (userAgentString.indexOf('Mac OS') !== -1) {
        parsed.os.name = 'MacOS';
    }
    else if (userAgentString.indexOf('Linux') !== -1) {
        parsed.os.name = 'Linux';
    }
    else if (userAgentString.indexOf('Android') !== -1) {
        parsed.os.name = 'Android';
    }
    else if (userAgentString.indexOf('like Mac') !== -1) {
        parsed.os.name = 'iOS';
    }
    // Parse OS version for Windows
    const windowsVersion = /Windows NT (\d+\.\d+)/.exec(userAgentString);
    if (windowsVersion) {
        parsed.os.version = windowsVersion[1];
    }
    // Parse OS version for MacOS
    const macosVersion = /Mac OS X (\d+\.\d+)/.exec(userAgentString);
    if (macosVersion) {
        parsed.os.version = macosVersion[1];
    }
    // Parse Linux version
    const linuxVersion = /Linux (.*)/.exec(userAgentString);
    if (linuxVersion) {
        parsed.os.version = linuxVersion[1];
    }
    // Parse Android version
    const androidVersion = /Android (\d+\.\d+)/.exec(userAgentString);
    if (androidVersion) {
        parsed.os.version = androidVersion[1];
    }
    // Parse iOS version
    const iosVersion = /OS (\d+)_(\d+)/.exec(userAgentString);
    if (iosVersion) {
        parsed.os.version = `${iosVersion[1]}.${iosVersion[2]}`;
    }
    return parsed;
};
