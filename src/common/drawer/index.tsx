import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay
} from "@chakra-ui/core";
import React from "react";

export function DrawerWrapper({
  isOpen,
  onClose,
  title,
  children: content,
  footerContent
}: any) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {content}
        {/* <DrawerFooter>{footerContent}</DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
