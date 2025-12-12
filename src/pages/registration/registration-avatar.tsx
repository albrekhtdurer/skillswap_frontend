import { AvatarUpload } from "../../shared/ui/avatar-upload/avatar-upload";
import PlaceholderIcon from "../../assets/icons/avatar-placeholder.svg";
import PlusIcon from "../../assets/icons/avatar-plus.svg";
import { useAvatar } from "../../shared/hooks/useAvatar";

type RegistrationAvatarFieldProps = {
  onAvatarChange: (file: File | null) => void;
};

export function RegistrationAvatarField({
  onAvatarChange,
}: RegistrationAvatarFieldProps) {
  const { avatarFile, setAvatar } = useAvatar();

  const handleAvatarChange = (file: File | null) => {
    setAvatar(file);
    onAvatarChange(file);
  };

  return (
    <AvatarUpload
      size={54}
      imageUrl={avatarFile ? URL.createObjectURL(avatarFile) : undefined}
      placeholderIcon={PlaceholderIcon}
      buttonIcon={<img src={PlusIcon} alt="" width={16} height={16} />}
      buttonPlacement="bottom-right"
      onChange={handleAvatarChange}
    />
  );
}
