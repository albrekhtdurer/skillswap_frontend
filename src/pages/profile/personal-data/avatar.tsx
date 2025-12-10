import { AvatarUpload } from "../../../shared/ui/avatar-upload/avatar-upload";
import EditIcon from "../../../assets/icons/edit-image.svg";
import styles from "./avatar.module.css";

type ProfileAvatarProps = {
  avatarUrl?: string;
  onAvatarChange: (file: File | null) => void;
};

export function ProfileAvatar({
  avatarUrl,
  onAvatarChange,
}: ProfileAvatarProps) {
  return (
    <AvatarUpload
      size={244}
      imageUrl={avatarUrl}
      buttonIcon={
        <img src={EditIcon} alt="" className={styles.profileAvatarIcon} />
      }
      buttonPlacement="bottom-right"
      onChange={onAvatarChange}
      buttonClassName={styles.profileAvatarButton}
    />
  );
}
