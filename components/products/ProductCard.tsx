import { FC, useMemo, useState } from "react";
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip } from "@mui/material";
import { IProduct } from '../../interfaces/products';

interface Props {
    product: IProduct
}

export const ProductCard:FC<Props> = ({ product }) => {

  const [isHovered, setIsHovered] = useState( false );
  const [isImageLoaded, setIsImageLoaded] = useState( false );

  const productImage = useMemo(() => {
    return isHovered 
      ? `/products/${ product.images[0] }` 
      : `/products/${ product.images[1] }`
  }, [isHovered, product.images])

  return (
    <Grid  
      item 
      xs={6} 
      sm={4} 
      onMouseEnter={ () => setIsHovered( true ) }
      onMouseLeave={ () => setIsHovered( false ) }
    >
        <Card>
          <NextLink href={`/product/${ product.slug }`} passHref prefetch={ false } legacyBehavior>
            <Link>
              <CardActionArea>
                {
                  ( product.inStock === 0 ) 
                    && (<Chip   
                        color="error" 
                        label='No hay disponibles' 
                        sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }} 
                      />)
                }
                
                <CardMedia 
                    component='img'
                    className="fadeIn"
                    image={ productImage }
                    alt={ product.title }
                    onLoad={ () => setIsImageLoaded( true )}
                />
              </CardActionArea>
            </Link>
          </NextLink>
        </Card>

        <Box marginTop={1} className='fadeIn' display={ isImageLoaded ? 'block' : 'none' }>
          <Typography fontWeight={700}>{ product.title }</Typography>
          <Typography fontWeight={400}>${ product.price }</Typography>
        </Box>

    </Grid>
  )
}
