import { Component } from "react";
import styles from "./cycle.module.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      params: {
        limit: 9,
        skip: 0,
      },
    };
    this.prevSkip = 0; // Track the previous skip value
  }

  // Fetch products when component mounts
  async componentDidMount() {
    this.fetchProducts(this.state.params);
  }

  // Fetch products when `skip` changes
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.params.skip !== prevState.params.skip) {
      this.fetchProducts(this.state.params);
    }
  }

  // Fetch products data from API
  async fetchProducts(params) {
    const { limit = 10, skip = 0 } = params;
    try {
      this.setState({ loading: true });
      const result = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await result.json(); // Corrected from `result.data()` to `result.json()`
      this.setState({ products: data.products });
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      this.setState({ loading: false });
    }
  }

  // Handle Previous button click
  handlePrevClick = () => {
    this.setState((state) => ({
      params: {
        ...state.params,
        skip: Math.max(state.params.skip - state.params.limit, 0),
      },
    }));
  };

  // Handle Next button click
  handleNextClick = () => {
    this.setState((state) => ({
      params: {
        ...state.params,
        skip: state.params.skip + state.params.limit,
      },
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Products</h1>
        <div>
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <div className={styles.productsContainer}>
              {this.state.products.length > 0 ? (
                this.state.products.map((item, idx) => (
                  <div key={idx} className={styles.productsItem}>
                    <img
                      className={styles.productsItemCover}
                      src={item.images?.[0]}
                      alt={`product-cover-${idx}`}
                    />
                    <span>{item.title}</span>
                  </div>
                ))
              ) : (
                <div>No products available</div>
              )}
            </div>
          )}
        </div>
        <div className={styles.paginationContainer}>
          <button
            type="button"
            onClick={this.handlePrevClick}
            disabled={this.state.params.skip === 0} // Disable if on first page
          >
            Prev
          </button>
          <button
            type="button"
            onClick={this.handleNextClick}
            disabled={this.state.products.length < this.state.params.limit} // Disable if no more products to load
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Products;
