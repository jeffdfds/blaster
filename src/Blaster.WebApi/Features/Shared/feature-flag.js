import Cookies from "js-cookie";
import konami from "konami";

export default class FeatureFlag {
    constructor() {
        this.flags = {};
        this.setupFlags();
        this.init();
    }

    setupFlags() {
         this.addFlag(new FlagTestFilter());
         this.addFlag(new FlagTopics());
    }

    init() {
        const ff_cookie = Cookies.get('blaster.ff');
        if (ff_cookie !== undefined) {
            const currentClientFlags = JSON.parse(atob(ff_cookie));
            var res = Object.values(currentClientFlags);

            res.forEach((val, i) => {
                if (Object.keys(this.flags).find(valx => valx.valueOf() === val.name.valueOf())) {
                    this.flags[val.name] = val;
                }
            })
        }
    }

    static setKeybinding() {
        new konami('/featureflags');
    }

    flagExists(name) {
        return this.flags[name] !== undefined;
    }

    addFlag(flag) {
        this.flags[flag.name] = flag;
    }

    getFlag(name) {
        return this.flags[name];
    }
}

class Flag {
    constructor() {
        this.enabled = false;
        this.name = '';
        this.description = "";
    }
}

class FlagTestFilter extends Flag {
    constructor() {
        super();
        this.name = 'testfilter';
        this.description = "Show Capabilities that are deemed \"tests\"";
    }
}

class FlagTopics extends Flag {
    constructor() {
        super();
        this.name = 'topics';
        this.description = "Show Topic functionality on a Capability page";
    }
}

export {FeatureFlag, Flag};