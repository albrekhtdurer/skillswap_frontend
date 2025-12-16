import { RegisterHeader } from "../../widgets/register-step-header";
import { UserSkillsRegForm } from "../../widgets/user-skills-reg-form";
import { RegisterStepInfo } from "../../widgets/register-step-info";
import SchoolBoard from "../../assets/icons/school-board.svg";
import styles from "./register-step3.module.css";
import { useState } from "react";
import { Modal } from "../../shared/ui/modal";
import { useSelector } from "../../features/store";
import { ProposalWidgets } from "../../widgets/post-reg-proposal-widgets/post-reg-proposal-widgets";
import { useTempSkillImages } from "../../shared/hooks/useTempSkillImages";
import { useRegistrationAvatar } from "../../shared/hooks/useRegistrationAvatar";

export const RegisterStep3Page = () => {
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const { reg } = useSelector((store) => store.forms);
  const { commitAvatar } = useRegistrationAvatar();
  const { commitImages } = useTempSkillImages();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <RegisterHeader />
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <UserSkillsRegForm setIsProposalOpen={setIsProposalOpen} />
        </div>

        <div className={styles.right}>
          <RegisterStepInfo
            image={SchoolBoard}
            title="Укажите, чем вы готовы поделиться"
            subtitle="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
          />
        </div>
      </div>
      {isProposalOpen && (
        <Modal onClose={() => setIsProposalOpen(false)}>
          <ProposalWidgets
            title="Ваше предложение"
            skillCanTeach={{
              name: reg.skillCanTeach.name!,
              fullDescription: reg.skillCanTeach.description!,
              categoryId: reg.skillCanTeach.category!,
              subCategoryId: reg.skillCanTeach.subcategory!,
            }}
            onClickEdit={() => setIsProposalOpen(false)}
            onClickReady={() => {
              console.log("Reg form:", reg);
              commitAvatar();
              commitImages();
            }}
          />
        </Modal>
      )}
    </div>
  );
};
