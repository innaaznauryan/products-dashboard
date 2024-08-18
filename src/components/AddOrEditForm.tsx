import { useEffect, useState, FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Container, Dialog, DialogTitle, FormControl, TextField, Button, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { createProductsThunk, updateProductsThunk } from '../redux/productThunk';
import { Product, FormProps } from '../types/types';
import { AppDispatch, RootState } from '../redux/store';
import Loading from './Loading';
import "./form.css";

const AddOrEditForm: FC<FormProps> = ({ open, onClose, product, updateList }) => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.products);

    const [formValues, setFormValues] = useState({
        id: "",
        name: "",
        description: "",
        price: 0,
        category: "",
        availability: false,
    });

    const cleanup = () => {
        setFormValues({
            id: "",
            name: "",
            description: "",
            price: 0,
            category: "",
            availability: false
        })
    }

    const handleClose = () => {
        cleanup();
        onClose();
        updateList();
    }

    const handleSubmit = async (values: Product) => {
        setFormValues(values);
        if (product?.id) {
            dispatch(updateProductsThunk({ ...values, id: product.id }));
        } else {
            dispatch(createProductsThunk({ ...values, id: uuidv4() }));
        }
        handleClose();
    };


    const productsSchema = yup.object().shape({
        id: yup.string(),
        name: yup.string()
            .required('Product name is required')
            .max(100, "Product name must be at most 100 characters long"),
        description: yup.string()
            .required('Product description is required')
            .max(150, "Product description must be at most 150 characters long"),
        price: yup.number()
            .positive('Product price must be a positive number')
            .required('Product price is required'),
        category: yup.string()
            .required('Product category is required')
            .max(100, "Product category must be at most 100 characters long"),
        availability: yup.boolean()
    });

    useEffect(() => {
        if (product?.id) {
            setFormValues(product);
        }
    }, [product]);

    return (
        <Container>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{product?.id ? "Edit Product" : "Add Product"}</DialogTitle>
                <Formik
                    initialValues={formValues}
                    validationSchema={productsSchema}
                    enableReinitialize={true}
                    validateOnChange={false}
                    validateOnBlur={true}
                    onSubmit={(values) => {
                        setFormValues(values);
                        handleSubmit(values);
                    }}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <FormControl sx={{ gap: '2rem', padding: "2rem" }}>
                                <Field name="name">
                                    {({ field }: { field: { name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; onBlur: () => void; } }) => (
                                        <TextField
                                            {...field}
                                            type='text'
                                            required
                                            label='Name'
                                            error={Boolean(<ErrorMessage name="name" />)}
                                            helperText={<ErrorMessage name="name" />}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormValues({ ...formValues, name: e.target.value });
                                            }}
                                            InputProps={{
                                                style: { color: 'gray' },
                                            }}
                                            InputLabelProps={{
                                                style: { color: 'gray' },
                                            }}
                                        />
                                    )}
                                </Field>
                                <Field name="description">
                                    {({ field }: { field: { name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; onBlur: () => void; } }) => (
                                        <TextField
                                            {...field}
                                            type='text'
                                            required
                                            label='Description'
                                            error={Boolean(<ErrorMessage name="description" />)}
                                            helperText={<ErrorMessage name="description" />}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormValues({ ...formValues, description: e.target.value });
                                            }}
                                            InputProps={{
                                                style: { color: 'gray' },
                                            }}
                                            InputLabelProps={{
                                                style: { color: 'gray' },
                                            }}
                                        />
                                    )}
                                </Field>
                                <Field name="price">
                                    {({ field }: { field: { name: string; value: number; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; onBlur: () => void; } }) => (
                                        <TextField
                                            {...field}
                                            type='number'
                                            required
                                            label='Price'
                                            error={Boolean(<ErrorMessage name="price" />)}
                                            helperText={<ErrorMessage name="price" />}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormValues({ ...formValues, price: +e.target.value });
                                            }}
                                            InputProps={{
                                                style: { color: 'gray' },
                                            }}
                                            InputLabelProps={{
                                                style: { color: 'gray' },
                                            }}
                                        />
                                    )}
                                </Field>
                                <Field name="category">
                                    {({ field }: { field: { name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; onBlur: () => void; } }) => (
                                        <TextField
                                            {...field}
                                            type='text'
                                            required
                                            label='Category'
                                            error={Boolean(<ErrorMessage name="category" />)}
                                            helperText={<ErrorMessage name="category" />}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormValues({ ...formValues, category: e.target.value });
                                            }}
                                            InputProps={{
                                                style: { color: 'gray' },
                                            }}
                                            InputLabelProps={{
                                                style: { color: 'gray' },
                                            }}
                                        />
                                    )}
                                </Field>
                                <Field name="availability">
                                    {({ field }: { field: { name: string; value: boolean; onChange: (e: ChangeEvent<HTMLInputElement>) => void; onBlur: () => void; } }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...field}
                                                    checked={field.value}
                                                    onChange={(e) => {
                                                        const { checked } = e.target;
                                                        field.onChange(e);
                                                        setFormValues({ ...formValues, availability: checked });
                                                    }}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: "gray" } }}
                                                />
                                            }
                                            label={field.value ? "In Stock" : "Out of Stock"}
                                        />
                                    )}
                                </Field>
                                <Button type='submit' variant="contained" sx={{ alignSelf: 'center' }}>
                                    Submit
                                </Button>
                            </FormControl>
                        </Form>
                    )}
                </Formik>
            </Dialog>
            {loading && <Loading />}
            {error && <Alert sx={{ margin: "2rem" }} severity="error">{error}</Alert>}
        </Container>
    )
}

export default AddOrEditForm