import { _decorator, tween, UIOpacity } from "cc";
import { AnimationNameMascot, CascadingMascot } from "db://shared-cascading-slot/components/cascading-mascot";
import { AnimationUtils } from "db://shared-components/shared/utils";
import Observer from "observer";
const { ccclass, property } = _decorator;
const { render, handle } = Observer;

@ccclass
export class StreetWarriorMascot extends CascadingMascot {
    async handleAnimTransition(anim: string) {
        // Check if both tracks are already playing animations
        const track0Entry = this.spineMascot.getCurrent(0);
        const track1Entry = this.spineMascot.getCurrent(1);

        if (track0Entry && track1Entry) {
            // Both tracks are playing, don't set new animations
            return;
        }

        const fadeInOutDuration = 0.3;
        const durationMascot = this.spineMascot.findAnimation(anim)?.duration;
        tween(this.node.getComponent(UIOpacity))
            .delay(durationMascot - fadeInOutDuration)
            .to(fadeInOutDuration, { opacity: 0 })
            .start();

        this.spineMascot.setAnimation(0, AnimationNameMascot.transition, false);
        this.spineMascot.setAnimation(1, anim, false);

        await AnimationUtils.delayTime(durationMascot);

        this.spineMascot.clearTracks();
        tween(this.node.getComponent(UIOpacity)).to(fadeInOutDuration, { opacity: 255 }).start();
        AnimationUtils.playSpine(this.spineMascot, "idle", true);
    }
}
