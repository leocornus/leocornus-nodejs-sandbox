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

Vue.component("step-navigation", {
    template: "#step-navigation-template",

    props: ["steps", "currentstep"]
});

Vue.component("step", {
    template: "#step-template",

    props: ["step", "stepcount", "currentstep"],

    computed: {
        active() {
            return this.step.id == this.currentstep;
        },

        firststep() {
            return this.currentstep == 1;
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

new Vue({
    el: "#app",

    data: {
        currentstep: 1,

        steps: [
            {
                id: 1,
                title: "Position",
                icon_class: "fa fa-map-marker"
            },
            {
                id: 2,
                title: "Category",
                icon_class: "fa fa-folder-open"
            },
            {
                id: 3,
                title: "Send",
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

