import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from "@chakra-ui/core";

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
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>{content}</DrawerBody>
        <DrawerFooter>{footerContent}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
