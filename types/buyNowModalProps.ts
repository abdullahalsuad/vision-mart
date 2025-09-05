interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  userID: string;
  productID: string;
  name: string;
  email: string;
  img: string;
  title: string;
  price: number;
}
