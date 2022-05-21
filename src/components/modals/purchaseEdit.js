import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const EditModal = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [sku, setSku] = useState('');
  const [start, setStart] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const quantityChange = e => {
    setQuantity(e.target.value);
  };

  const updateHandler = () => {
    fetch('http://localhost:3001/api/purchase/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mastersku: sku,
        date: start,
        quantity: quantity,
      }),
    });
  };

  return (
    <>
      <Button onClick={onOpen} _hover={{ cursor: 'pointer' }} mx={4}>
        Edit Product
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update the Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="sku">Updated Master SKU</FormLabel>
              <Input
                id="sku"
                placeholder="Enter SKU"
                textAlign="center"
                onChange={e => {
                  setSku(e.target.value);
                }}
                required
              />
              <DatePicker
                selected={start}
                onChange={date => setStart(date)}
              ></DatePicker>
              <FormLabel htmlFor="quantity">Updated Quantity</FormLabel>
              <Input
                id="quantity"
                placeholder="Enter Quantity"
                onChange={quantityChange}
                required
                textAlign="center"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={'blue'}
              onClick={() => {
                updateHandler();
              }}
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
