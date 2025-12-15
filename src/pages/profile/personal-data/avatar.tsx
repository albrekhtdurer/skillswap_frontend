import { AvatarUpload } from "../../../shared/ui/avatar-upload/avatar-upload";
import EditIcon from "../../../assets/icons/edit-image.svg";
import styles from "./avatar.module.css";
import { useAvatar } from "../../../shared/hooks/useAvatar";
import PlaceholderIcom from "../../../assets/icons/avatar-placeholder.svg";

export function ProfileAvatar() {
  const { avatarFile, setAvatar } = useAvatar();

  return (
    <AvatarUpload
      size={244}
      imageUrl={avatarFile ? URL.createObjectURL(avatarFile) : undefined}
      placeholderIcon={PlaceholderIcom}
      buttonIcon={
        <img src={EditIcon} alt="" className={styles.profileAvatarIcon} />
      }
      buttonPlacement="bottom-right"
      onChange={setAvatar}
      buttonClassName={styles.profileAvatarButton}
    />
  );
}
