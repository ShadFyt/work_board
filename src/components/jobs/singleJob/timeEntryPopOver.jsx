import React, { useState } from "react";

import ClockInForm from "./clockInForm";
import { useDeleteTimeEntryMutation } from "../../../features/api/apiSlice";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  IconButton,
  useBoolean,
  Text,
  Box,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { RiMenuUnfoldLine } from "react-icons/ri";

const TimeEntryPopOver = ({ timeEntry, employeeName }) => {
  const [deleteTimeEntry] = useDeleteTimeEntryMutation();
  const [isDeleting, setIsDeleting] = useBoolean();
  const toast = useToast();
  const handleDelete = async (id) => {
    toast({
      title: `Time entry : ${timeEntry.id} - Deleted`,
      description: `${employeeName} - ${timeEntry.date}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    await deleteTimeEntry(id);
  };

  return (
    <Popover onClose={() => setTimeout(setIsDeleting.off, 500)}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton size={"lg"} bg={"white"} icon={<RiMenuUnfoldLine />} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              {isDeleting ? (
                <Text fontWeight={"bold"} color={"red"}>
                  Confirm Delete
                </Text>
              ) : (
                "Edit or Delete"
              )}
            </PopoverHeader>
            <PopoverBody>
              {isDeleting ? (
                <Box>
                  <Button
                    color={"white"}
                    bgColor={"red.600"}
                    onClick={() => handleDelete(timeEntry.id)}
                  >
                    Delete
                  </Button>
                  <Button ml={2} onClick={onClose}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                <>
                  <ClockInForm
                    timeEntry={timeEntry}
                    employeeName={employeeName}
                    bgColor={"gray.300"}
                    mr={2}
                  />
                  <Button
                    bgColor={"red.500"}
                    onClick={setIsDeleting.on}
                    _hover={{ bgColor: "red.400" }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default TimeEntryPopOver;
