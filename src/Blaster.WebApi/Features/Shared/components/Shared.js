import Vue from "vue";
import UserManagementPlugin from "../plugins/userManagementPlugin";
import HttpClientPlugin from "../plugins/httpClientPlugin";
import ChannelPickerComponent from "./ChannelPickerComponent";
import ChannelMinimalComponent from "./ChannelMinimalComponent";
import ChannelListComponent from "./ChannelListComponent";
import ChannelDropdownComponent from "./ChannelDropdownComponent";
import ChannelIconComponent from "./ChannelIconComponent";
import ChannelInputComponent from "./ChannelInputComponent";
import BannerComponent from "./BannerComponent";
import {InstallRequestMsalHandler} from "../plugins/HttpHandlers/RequestMsalHandler";
import VueCountdown from '@chenfengyuan/vue-countdown';

Vue.use(UserManagementPlugin);
Vue.use(HttpClientPlugin);
InstallRequestMsalHandler(Vue);

new Vue({
    el: ".navbar",
    computed: {
        showIEBanner: function () {
            return isIE();
        }
    },
    methods: {
        toggleActive: function () {
            this.active = !this.active;
        },
        generateCountdownTime: function() {
            var now = new Date();
            var newYear = new Date("2020", "02", "01");
            return newYear - now;
        }
    },
    computed: {
        isActive: function() {
            return this.active;
        },
        time: function() {
            return this.generateCountdownTime();
        }
    },
    data: {
        active: false
    },
    components: {
        'sunset-countdown': VueCountdown,
        'banner': BannerComponent
    }
    
});



function isIE()
{
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
}

export {BannerComponent, ChannelPickerComponent, ChannelListComponent, ChannelMinimalComponent, ChannelDropdownComponent, ChannelIconComponent, ChannelInputComponent, isIE};