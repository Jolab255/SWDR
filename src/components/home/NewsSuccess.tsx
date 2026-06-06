import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { NewsArticle } from '../../utils/mockData';

interface NewsSuccessProps {
  news: NewsArticle[];
}

export default function NewsSuccess({ news }: NewsSuccessProps) {
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

        <Grid container spacing={4}>
          {news.map((article) => (
            <Grid size={{ xs: 12, md: 4 }} key={article.id}>
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
                  <Button endIcon={<ArrowForwardIcon />} sx={{ fontWeight: '900', p: 0, color: '#be185d', '&:hover': { bgcolor: 'transparent', color: '#9d174d', pl: 1 } }}>
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
