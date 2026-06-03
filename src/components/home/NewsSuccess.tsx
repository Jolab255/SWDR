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
    <Box sx={{ py: 12, bgcolor: '#f0f9ff', borderTop: '4px solid #1e293b' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 8, flexWrap: 'wrap', gap: 3 }}>
          <Box>
            <Typography variant="overline" sx={{ fontWeight: '900', color: '#0284c7', letterSpacing: '3px' }}>
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
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '3px solid #1e293b', boxShadow: '8px 8px 0px #1e293b', borderRadius: 0, '&:hover': { transform: 'translate(-4px, -4px)', boxShadow: '12px 12px 0px #0284c7' }, transition: 'all 0.2s' }}>
                <CardMedia component="img" height="240" image={article.image} alt={article.title} loading="lazy" />
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Chip label={article.category} size="small" sx={{ fontWeight: '900', borderRadius: 0, border: '2px solid #1e293b', bgcolor: 'white', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: '900', mb: 2, color: '#1e293b', lineHeight: 1.2 }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.7, textAlign: 'justify' }}>
                    {article.summary}
                  </Typography>
                  <Button endIcon={<ArrowForwardIcon />} sx={{ fontWeight: '900', p: 0, color: '#0284c7', '&:hover': { bgcolor: 'transparent', color: '#0369a1', pl: 1 } }}>
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
