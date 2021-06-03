import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  GridList,
  GridListTile,
  makeStyles,
} from '@material-ui/core';
import FilesDropzone from 'src/components/FilesDropzone';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '15px 15px 0px 15px',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    cursor: 'pointer',
  },
}));

const Files = ({ className, files, ...rest }) => {
  const classes = useStyles();
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  console.log('FILES', files);
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <GridList className={classes.gridList} cols={2.5}>
        {files.map((tile, index) => (
          <GridListTile key={tile} onClick={() => setSliderIndex(index)}>
            <img
              src={tile}
              data-index={index}
              onClick={() => setIsImageViewerOpen(true)}
            />
          </GridListTile>
        ))}
      </GridList>
      {/* <Card>
        <CardContent>
          <FilesDropzone />
        </CardContent>
      </Card> */}
      <Box mt={3}>
        {isImageViewerOpen && (
          <Lightbox
            images={files}
            startIndex={sliderIndex}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}
        {/* <Grid
          container
          spacing={3}
        >
          {files.map((file) => (
            <Grid
              item
              key={file.id}
              lg={4}
              md={4}
              sm={6}
              xs={12}
            > 
              

              <FileCard file={file} />
            </Grid>
          ))}
        </Grid> */}
      </Box>
    </div>
  );
};

Files.propTypes = {
  className: PropTypes.string,
  files: PropTypes.array.isRequired,
};

export default Files;
