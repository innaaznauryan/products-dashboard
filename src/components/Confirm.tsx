import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { removeProductsThunk } from '../redux/productThunk';
import { AppDispatch } from '../redux/store';
import { ConfirmProps } from '../types/types';

const Confirm: FC<ConfirmProps> = ({ open, onClose, product, updateList }) => {
    const dispatch: AppDispatch = useDispatch()

    const handleDelete = () => {
        dispatch(removeProductsThunk(product));
        onClose();
        updateList();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogContent >Are you sure to delete this Product?</DialogContent>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{product.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>{product.category}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Availability</TableCell>
                        <TableCell>{product.availability ? "In Stock" : "Out of Stock"}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div>
                <Button
                    sx={{ margin: '20px 5px' }}
                    onClick={onClose}
                    variant='contained'>
                    Cancel
                </Button>
                <Button
                    sx={{ margin: '20px 5px' }}
                    onClick={handleDelete}
                    variant='contained'
                    color='error'>
                    Delete
                </Button>
            </div>
        </Dialog>
    )
}

export default Confirm