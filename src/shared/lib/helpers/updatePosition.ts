import type { PopupMenuPosition } from "../../ui/popup-menu/popup-menu";

export const updatePosition = (
  menuRef: React.RefObject<HTMLDivElement | null>,
  anchorRef: React.RefObject<HTMLElement | null> | undefined,
  position: PopupMenuPosition,
): void => {
  const menuElement = menuRef.current;
  if (!menuElement) return;

  // Если позиция fixed-top-right, позиционируем относительно viewport
  if (position === "fixed-top-right") {
    menuElement.style.top = "104px";
    menuElement.style.right = "16px";
    menuElement.style.left = "auto";
    return;
  }

  // Для остальных позиций нужен anchorRef
  const anchorElement = anchorRef?.current;
  if (!anchorElement) return;

  const {
    top: anchorTop,
    left: anchorLeft,
    right: anchorRight,
    bottom: anchorBottom,
  } = anchorElement.getBoundingClientRect();
  const menuWidth = menuElement.offsetWidth;
  const menuHeight = menuElement.offsetHeight;

  let top = 0;
  let left = 0;

  const gap = 8; // Отступ между якорем и меню

  switch (position) {
    case "top-left":
      top = anchorTop - menuHeight - gap;
      left = anchorLeft;
      break;
    case "top-right":
      top = anchorTop - menuHeight - gap;
      left = anchorRight - menuWidth;
      break;
    case "bottom-left":
      top = anchorBottom + gap;
      left = anchorLeft;
      break;
    case "bottom-right":
      top = anchorBottom + gap;
      left = anchorRight - menuWidth;
      break;
  }

  // Проверка на выход за границы экрана
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (left + menuWidth > viewportWidth) {
    left = viewportWidth - menuWidth - 8;
  }
  if (left < 0) {
    left = 8;
  }

  if (top + menuHeight > viewportHeight) {
    top = anchorTop - menuHeight;
  }
  if (top < 0) {
    top = anchorBottom;
  }

  menuElement.style.top = `${top}px`;
  menuElement.style.left = `${left}px`;
  menuElement.style.right = "auto";
};
