import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {styled} from '@mui/system';
import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Pagination,
    Slider,
    TextField,
    Typography
} from '@mui/material';
import {getCatalog} from '../actions/productActions';
import ProductCard from './ProductCard';
import {Search} from "@carbon/icons-react";
import LoadingComponent from "./Loading";

const CatalogContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

const SearchBar = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
}));

const FiltersContainer = styled(Grid)({
    paddingRight: '40px',

});

const ProductGrid = styled(Grid)({
    marginBottom: '40px',
    justifyContent: 'start',
    '& > .MuiGrid-item': {
        marginBottom: '20px',
    },
});

const CheckboxContainer = styled(Grid)({
    display: 'flex',
    flexDirection: 'column'
})

const SearchButton = styled(Button)({
    marginLeft: '8px',
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
});

const Catalog = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.catalog);
    const minPrice = useSelector((state) => state.product.minPrice);
    const maxPrice = useSelector((state) => state.product.maxPrice);
    const categories = useSelector((state) => state.product.categories);
    const volumes = useSelector((state) => state.product.volumes);
    const isLoading = useSelector((state) => state.product.isLoading);
    const error = useSelector((state) => state.product.error);
    const total = useSelector((state) => state.product.totalPages);
    const [currentPage, setCurrentPage] = useState(1);
    const productPerPage = 12;
    const totalPages = Math.ceil(total / productPerPage);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [priceFilter, setPriceFilter] = useState([minPrice, maxPrice]);
    const [volumeFilter, setVolumeFilter] = useState([]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleApplyFilters = () => {
        dispatch(
            getCatalog({
                page: currentPage,
                limit: productPerPage,
                category: categoryFilter,
                search: searchTerm,
                volume: volumeFilter,
                price: priceFilter,
            })
        );
    };

    useEffect(() => {
        if (!isLoading) {
            dispatch(
                getCatalog({
                    page: currentPage,
                    limit: productPerPage,
                    search: searchTerm,
                })
            );
        }
    }, [dispatch, currentPage, productPerPage]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        if (categoryFilter.includes(category)) {
            setCategoryFilter(categoryFilter.filter((item) => item !== category));
        } else {
            setCategoryFilter([...categoryFilter, category]);
        }
    };

    const handlePriceChange = (event, newValue) => {
        setPriceFilter(newValue);
    };

    const handleVolumeChange = (event) => {
        const volume = event.target.value;
        if (volumeFilter.includes(volume)) {
            setVolumeFilter(volumeFilter.filter((item) => item !== volume));
        } else {
            setVolumeFilter([...volumeFilter, volume]);
        }
    };

    return (
        isLoading ? (<LoadingComponent/>) :
            (<CatalogContainer maxWidth="xl">
                <SearchBar container alignItems="center">
                    <Grid item xs={12} sm={4} md={3}>
                        <TextField
                            fullWidth
                            label="Search"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <SearchButton
                            variant="outlined"
                            color="primary"
                            onClick={handleApplyFilters}
                        >
                            <Search size={36}/>
                        </SearchButton>
                    </Grid>
                </SearchBar>
                <Grid container>
                    <FiltersContainer item xs={12} sm={4} md={3}>
                        <Typography variant="h6">Filters</Typography>
                        <Typography variant="subtitle1">Категорія</Typography>
                        <CheckboxContainer>
                            {categories.map((category) => (
                                <FormControlLabel
                                    key={category._id}
                                    control={
                                        <Checkbox
                                            checked={categoryFilter.includes(category._id)}
                                            onChange={handleCategoryChange}
                                            value={category._id}
                                        />
                                    }
                                    label={category.name?.uk}
                                />
                            ))}
                        </CheckboxContainer>

                        <Typography variant="subtitle1">Ціна</Typography>
                        <Slider
                            value={priceFilter}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={minPrice}
                            max={maxPrice}
                            marks={[
                                {value: minPrice, label: `${minPrice} грн`},
                                {value: maxPrice, label: `${maxPrice} грн`},
                            ]}
                        />
                        <Typography variant="subtitle1">Об'єм</Typography>
                        <CheckboxContainer>
                            {volumes.map((volume) => (
                                <FormControlLabel
                                    key={volume}
                                    control={
                                        <Checkbox
                                            checked={volumeFilter.includes(volume)}
                                            onChange={handleVolumeChange}
                                            value={volume}
                                        />
                                    }
                                    label={volume}
                                />
                            ))}
                        </CheckboxContainer>

                        <Button variant="outlined" size={'large'} color="primary" onClick={handleApplyFilters}>
                            Apply Filters
                        </Button>
                    </FiltersContainer>
                    <ProductGrid item spacing={2} container xs={12} sm={8} md={9}>
                        {products.map((product) => (
                            <Grid item key={product.id} xs={6} sm={4} md={3}>
                                <ProductCard product={product}/>
                            </Grid>
                        ))}
                    </ProductGrid>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Grid>
            </CatalogContainer>)
    )
        ;
};

export default Catalog;
