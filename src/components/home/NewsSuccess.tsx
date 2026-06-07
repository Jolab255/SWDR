import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Dialog,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import type { NewsArticle } from '../../utils/mockData';

interface NewsSuccessProps {
  news: NewsArticle[];
}

export default function NewsSuccess({ news }: NewsSuccessProps) {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  // Calculate visible cards dynamically based on screen size and news counts
  let visibleCards = 1;
  if (isMd) {
    visibleCards = Math.min(3, news.length);
  } else if (isSm) {
    visibleCards = Math.min(2, news.length);
  } else {
    visibleCards = 1;
  }

  const maxIndex = Math.max(0, news.length - visibleCards);

  // Keep carouselIndex in bounds during window resize / responsive adjustments
  useEffect(() => {
    if (carouselIndex > maxIndex) {
      setCarouselIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, carouselIndex]);

  const handlePrev = () => setCarouselIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));

  if (news.length === 0) return null;

  return (
    <Box 
      sx={{ 
        py: 7, 
        backgroundImage: 'linear-gradient(180deg, rgba(253, 242, 248, 0.97) 0%, rgba(253, 242, 248, 0.97) 100%), url("/favicon.png")',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 120px 120px',
        backgroundAttachment: 'scroll, fixed',
        borderTop: '1px solid #e2e8f0' 
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 8, flexWrap: 'wrap', gap: 3 }}>
          <Box>
            <Typography variant="overline" sx={{ fontWeight: '900', color: '#be185d', letterSpacing: '3px' }}>
              Stories of Transformation
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', mt: 1, letterSpacing: '-1px' }}>
              Latest From the Field
            </Typography>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', width: '100%', overflow: 'visible', px: { xs: 2, sm: 6 } }}>
          {maxIndex > 0 && (
            <IconButton
              onClick={handlePrev}
              disabled={carouselIndex === 0}
              sx={{
                position: 'absolute',
                left: { xs: -8, sm: -24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                bgcolor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                border: '1px solid #e2e8f0',
                borderRadius: 1,
                width: 44,
                height: 44,
                color: '#1e293b',
                '&:hover': { bgcolor: 'primary.light', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
                '&.Mui-disabled': { bgcolor: 'grey.100', opacity: 0.5, border: '1px solid #e2e8f0', boxShadow: 'none' }
              }}
            >
              ◀
            </IconButton>
          )}

          <Box sx={{ overflow: 'hidden', width: '100%' }}>
            <Box sx={{ 
              display: 'flex', 
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
              transform: `translateX(-${carouselIndex * (100 / visibleCards)}%)`
            }}>
              {news.map((article) => (
                <Box key={article.id} sx={{ 
                  flex: { 
                    xs: '0 0 100%', 
                    sm: `0 0 ${100 / Math.min(2, news.length)}%`, 
                    md: `0 0 ${100 / Math.min(3, news.length)}%` 
                  },
                  px: 2, boxSizing: 'border-box'
                }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 2, '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }, transition: 'all 0.2s ease' }}>
                    <CardMedia component="img" height="240" image={article.image} alt={article.title} loading="lazy" />
                    <CardContent sx={{ p: 4, flexGrow: 1 }}>
                      <Chip label={article.category} size="small" sx={{ fontWeight: '900', borderRadius: 1, border: '1px solid #e2e8f0', bgcolor: 'white', mb: 2 }} />
                      <Typography variant="h5" sx={{ fontWeight: '900', mb: 2, color: '#1e293b', lineHeight: 1.2 }}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.7, textAlign: 'justify' }}>
                        {article.summary}
                      </Typography>
                      <Button 
                        onClick={() => setSelectedArticle(article)}
                        endIcon={<ArrowForwardIcon />} 
                        sx={{ fontWeight: '900', p: 0, color: '#be185d', '&:hover': { bgcolor: 'transparent', color: '#9d174d', pl: 1 } }}
                      >
                        Read Full Story
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          {maxIndex > 0 && (
            <IconButton
              onClick={handleNext}
              disabled={carouselIndex === maxIndex}
              sx={{
                position: 'absolute',
                right: { xs: -8, sm: -24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                bgcolor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                border: '1px solid #e2e8f0',
                borderRadius: 1,
                width: 44,
                height: 44,
                color: '#1e293b',
                '&:hover': { bgcolor: 'primary.light', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
                '&.Mui-disabled': { bgcolor: 'grey.100', opacity: 0.5, border: '1px solid #e2e8f0', boxShadow: 'none' }
              }}
            >
              ▶
            </IconButton>
          )}

          {maxIndex > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <Box key={idx} onClick={() => setCarouselIndex(idx)} sx={{
                  width: 10, height: 10, bgcolor: carouselIndex === idx ? '#be185d' : '#cbd5e1',
                  borderRadius: '50%',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  '&:hover': { transform: 'scale(1.3)', bgcolor: '#be185d' }
                }} />
              ))}
            </Box>
          )}
        </Box>
      </Container>

      {/* --- NEWS DETAILS DIALOG --- */}
      <Dialog
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 2, border: '1px solid #e2e8f0', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' } } }}
      >
        {selectedArticle && (
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="overline" sx={{ fontWeight: '900', color: '#be185d', letterSpacing: '2px' }}>
                {selectedArticle.category} — {selectedArticle.date}
              </Typography>
              <IconButton onClick={() => setSelectedArticle(null)} sx={{ border: '1px solid #e2e8f0', borderRadius: 1, bgcolor: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', mb: 3, letterSpacing: '-0.5px', fontSize: { xs: '1.6rem', md: '2.2rem' } }}>
              {selectedArticle.title}
            </Typography>

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#be185d', mb: 4 }}>
              By {selectedArticle.author}
            </Typography>

            <Box component="img" src={selectedArticle.image} alt={selectedArticle.title} sx={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 2, mb: 4 }} />

            <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.8, fontSize: '1.1rem', textAlign: 'justify', whiteSpace: 'pre-line' }}>
              {selectedArticle.content}
            </Typography>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
