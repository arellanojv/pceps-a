import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  IconButton,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';
import Label from 'src/components/Label';
import getInitials from 'src/utils/getInitials';

const statusOptions = [
  {
    id: 'all',
    name: 'All'
  },
  {
    id: 'paid',
    name: 'Paid'
  },
  {
    id: 'pending',
    name: 'Pending'
  },
  {
    id: 'canceled',
    name: 'Canceled'
  }
];

const sortOptions = [
  {
    value: 'createdAt|desc',
    label: 'Newest first'
  },
  {
    value: 'createdAt|asc',
    label: 'Oldest first'
  }
];

const getStatusLabel = (purchaseRequestStatus) => {
  const map = {
    2: {
      text: 'On Hold',
      color: 'error'
    },
    1: {
      text: 'Active',
      color: 'success'
    },
    0: {
      text: 'Inactive',
      color: 'warning'
    }
  };

  const { text, color } = map[purchaseRequestStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const applyFilters = (purchaseRequests, query, filters) => {
  return purchaseRequests.filter((purchaseRequest) => {
    let matches = true;

    if (query) {
      const properties = ['name', 'email'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (purchaseRequest.customer[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    if (filters.status && purchaseRequest.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (purchaseRequests, page, limit) => {
  return purchaseRequests.slice(page * limit, page * limit + limit);
};

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  statusField: {
    flexBasis: 200
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    backgroundColor: colors.red[500],
    color: colors.common.white
  }
}));

const Results = ({ className, purchaseRequests, ...rest }) => {
// const Results = ({ className, purchaseRequests, ...rest }) => {
  const classes = useStyles();
  const [selectedPurchaseRequests, setSelectedPurchaseRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    status: null
  });

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllPurchaseRequests = (event) => {
    setSelectedPurchaseRequests(event.target.checked
      ? purchaseRequests.map((purchaseRequest) => purchaseRequest.id)
      : []);
  };

  const handleSelectOnePurchaseRequest = (event, purchaseRequestId) => {
    if (!selectedPurchaseRequests.includes(purchaseRequestId)) {
      setSelectedPurchaseRequests((prevSelected) => [...prevSelected, purchaseRequestId]);
    } else {
      setSelectedPurchaseRequests((prevSelected) => prevSelected.filter((id) => id !== purchaseRequestId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  // Usually query is done on backend with indexing solutions
  const filteredPurchaseRequest = applyFilters(purchaseRequests, query, filters);
  const paginatedPurchaseRequests = applyPagination(filteredPurchaseRequest, page, limit);
  const enableBulkOperations = selectedPurchaseRequests.length > 0;
  const selectedSomePurchaseRequests = selectedPurchaseRequests.length > 0 && selectedPurchaseRequests.length < purchaseRequests.length;
  const selectedAllPurchaseRequests = selectedPurchaseRequests.length === purchaseRequests.length;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={2}>
        <Box
          display="flex"
          alignItems="center"
        >
          <TextField
            className={classes.queryField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                    fontSize="small"
                    color="action"
                  >
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            placeholder="Search puchase request by title"
            value={query}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <TextField
            className={classes.statusField}
            label="Status"
            name="status"
            onChange={handleStatusChange}
            select
            SelectProps={{ native: true }}
            value={filters.status || 'all'}
            variant="outlined"
          >
            {statusOptions.map((statusOption) => (
              <option
                key={statusOption.id}
                value={statusOption.id}
              >
                {statusOption.name}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllPurchaseRequests}
              indeterminate={selectedSomePurchaseRequests}
              onChange={handleSelectAllPurchaseRequests}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={1200}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllPurchaseRequests}
                    indeterminate={selectedSomePurchaseRequests}
                    onChange={handleSelectAllPurchaseRequests}
                  />
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Budget
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Deadline
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPurchaseRequests.map((purchaseRequests) => {
                const isPurchaseRequestSelected = selectedPurchaseRequests.includes(purchaseRequests.id);

                return (
                  <TableRow
                    hover
                    key={purchaseRequests.id}
                    selected={isPurchaseRequestSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isPurchaseRequestSelected}
                        onChange={(event) => handleSelectOnePurchaseRequest(event, purchaseRequests.id)}
                        value={isPurchaseRequestSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar className={classes.avatar}>
                          {getInitials(purchaseRequests.title)}
                        </Avatar>
                        <Box ml={2}>
                          <Link
                            variant="subtitle2"
                            color="textPrimary"
                            component={RouterLink}
                            underline="none"
                            to="#"
                          >
                            {purchaseRequests.title}
                          </Link>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            {purchaseRequests.title}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {getStatusLabel(purchaseRequests.status)}
                    </TableCell>
                    <TableCell>
                      ₱ {numeral(purchaseRequests.budget).format(`${purchaseRequests.currency}0,0.00`)}
                    </TableCell>
                    <TableCell>
                      {purchaseRequests.id}
                    </TableCell>
                    <TableCell>
                      {moment(purchaseRequests.projectdeadline).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to="#"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to={`/app/purchase-request/`+purchaseRequests.id}
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={filteredPurchaseRequest.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  purchaseRequests: PropTypes.array.isRequired
};

Results.defaultProps = {
  purchaseRequests: []
};

export default Results;
