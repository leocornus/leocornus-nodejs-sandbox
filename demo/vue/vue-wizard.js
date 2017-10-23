/**
 * define the componet for each step or the step navigation bar.
 */
Vue.component("step-navigation-step", {
    // we will use the html blok with the id selector.
    template: "#step-navigation-step-template",

    // each step will need this 2 attributes to be binded.
    props: ["step", "currentstep"],

    // computed is the dynamic binding, we could use function here.
    // it is like data.
    computed: {
        indicatorclass: function() {
            return {
                active: this.step.id == this.currentstep,
                complete: this.currentstep > this.step.id
            };
        }
    }
});

/**
 * define component the step navigation bar.
 */
Vue.component("step-navigation", {

    template: "#step-navigation-template",

    props: ["steps", "currentstep"]
});

/**
 * define the component for each step.
 */
Vue.component("step", {
    template: "#step-template",

    props: ["step", "stepcount", "currentstep"],

    computed: {
        active() {
            return this.step.id == this.currentstep;
        },

        notFirstStep() {
            return this.currentstep > 1;
        },

        laststep() {
            return this.currentstep == this.stepcount;
        },

        stepWrapperClass() {
            return {
                active: this.active
            };
        }
    },

    methods: {
        nextStep() {
            this.$emit("step-change", this.currentstep + 1);
        },

        lastStep() {
            this.$emit("step-change", this.currentstep - 1);
        }
    }
});

/**
 * the the Vue application object for the Wizard app.
 */
new Vue({
    el: "#app",

    data: {
        // initial step.
        // using the computed to set it if this wizard are in the middle.
        currentstep: 1,

        steps: [
            {
                id: 1,
                title: "User Information",
                icon_class: "fa fa-map-marker"
            },
            {
                id: 2,
                title: "House Preference",
                icon_class: "fa fa-folder-open"
            },
            {
                id: 3,
                title: "House Specifications",
                icon_class: "fa fa-paper-plane"
            }
        ]
    },

    methods: {
        stepChanged(step) {
            this.currentstep = step;
        }
    }
});

