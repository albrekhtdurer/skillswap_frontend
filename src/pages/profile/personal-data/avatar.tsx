import { AvatarUpload } from "../../../shared/ui/avatar-upload/avatar-upload";
import EditIcon from "../../../assets/icons/edit-image.svg";
import styles from "./avatar.module.css";
import { useAvatar } from "../../../shared/hooks/useAvatar";

export function ProfileAvatar() {
  const { avatarFile, setAvatar } = useAvatar();

  return (
    <AvatarUpload
      size={244}
      imageUrl={avatarFile ? URL.createObjectURL(avatarFile) : undefined}
      buttonIcon={
        <img src={EditIcon} alt="" className={styles.profileAvatarIcon} />
      }
      buttonPlacement="bottom-right"
      onChange={setAvatar}
      buttonClassName={styles.profileAvatarButton}
    />
  );
}
