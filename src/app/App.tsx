import { RegisterStepInfo } from "../widgets/register-step-info/index";
import LampImg from "../assets/icons/light-bulb.svg";
import BoardImg from "../assets/icons/school-board.svg";
import UserImg from "../assets/icons/user-info.svg";

export default function Widget() {
  return (
    <>
      <RegisterStepInfo
        image={LampImg}
        title="Добро пожаловать в SkillSwap!"
        subtitle="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
      />
      <br />
      <RegisterStepInfo
        image={BoardImg}
        title="Укажите, чем вы готовы поделиться"
        subtitle="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
      />
      <br />
      <RegisterStepInfo
        image={UserImg}
        title="Расскажите немного о себе"
        subtitle="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
      />
    </>
  );
}
