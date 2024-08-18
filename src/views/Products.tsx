import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, CardContent, Typography, Grid, Pagination, PaginationItem, Button, Alert, TextField, Checkbox, FormControlLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import { Edit, Delete } from '@mui/icons-material';
import { RootState, AppDispatch } from "../redux/store";
import { getProductsThunk } from '../redux/productThunk';
import { Product } from '../types/types';
import Loading from '../components/Loading';
import AddOrEditForm from '../components/AddOrEditForm';
import Confirm from '../components/Confirm';

const Products = () => {

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector((state: RootState) => state.products);

  const maxLength = 100;
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(false);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const updateList = () => {
    setCurrentPage(1);
    setFilter(false);
    setSearchQuery("");
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.checked);
    setCurrentPage(1);
  };

  const handleOpenEdit = (product: Product) => {
    setProductToEdit(product);
    setOpenDialog(true);
  }
  const handleOpenCreate = () => {
    setProductToEdit(null);
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProductToEdit(null);
  }

  const handleOpenConfirm = (product: Product) => {
    setProductToDelete(product);
    setOpenConfirm(true);
  }
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setProductToDelete(null);
  }

  const handleClick = () => {
    window.location.reload();
  }

  useEffect(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    let filteredData = data;

    if (searchQuery) {
      filteredData = filteredData.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter) {
      filteredData = filteredData.filter(product => product.availability);
    }

    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    setCurrentProducts(filteredData.slice(indexOfFirstProduct, indexOfLastProduct));
  }, [currentPage, data, searchQuery, filter])

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch])

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>
      <Alert sx={{ margin: "2rem" }} severity="error">{error}</Alert>
      <Button onClick={handleClick}>Refresh Page</Button>
    </>;
  }

  return (
    <main>
      <h1>Products</h1>

      <Container sx={{ display: "flex", justifyContent: "space-between", gap: "24px" }}>
        <TextField
          type="text"
          label="Search Products"
          onChange={handleSearch}
          InputProps={{
            style: { color: 'gray' },
          }}
          InputLabelProps={{
            style: { color: 'gray' },
          }} />

        <FormControlLabel
          control={
            <Checkbox
              checked={filter}
              onChange={handleFilter}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: "gray" } }}
            />
          }
          label="Filter Available Products"
        />
      </Container>

      {currentProducts.length > 0 && <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          />
        )}
        sx={{ marginY: 2, color: "gray", display: "flex", justifyContent: "center" }}
      />}

      <Grid container spacing={2}>
        {currentProducts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="gray">
              No products available.
            </Typography>
          </Grid>) :
          currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent>
                  <Container sx={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                    <Edit sx={{ cursor: "pointer", color: "gray", fontSize: "18px" }} onClick={() => handleOpenEdit(product)} />
                    <Delete sx={{ cursor: "pointer", color: "gray", fontSize: "18px" }} onClick={() => handleOpenConfirm(product)} />
                  </Container>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {
                      product.description.length > maxLength
                        ? `${product.description.slice(0, maxLength)}...`
                        : product.description
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body2" color={product.availability ? "green" : "red"}>
                    Availability: {product.availability ? "In Stock" : "Out of Stock"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Button onClick={handleOpenCreate} sx={{ cursor: "pointer", padding: "1rem", margin: "1rem" }}>
        <AddIcon />Add
      </Button>

      {<AddOrEditForm
        open={openDialog}
        onClose={handleCloseDialog}
        product={productToEdit}
        updateList={updateList}
      />}

      {productToDelete && <Confirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        product={productToDelete}
        updateList={updateList}
      />}
    </main>
  )
}

export default Products