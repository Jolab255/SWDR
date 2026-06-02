import { Box, Container, Paper } from '@mui/material';
import NewsCMS from '../components/NewsCMS';

export default function CMSDashboard() {
  return (
    <Box sx={{ py: 6, bgcolor: '#f8fafc', minHeight: '80vh' }}>
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            border: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'white',
            boxShadow: '0 4px 30px rgba(0,0,0,0.01)'
          }}
        >
          <NewsCMS />
        </Paper>
      </Container>
    </Box>
  );
}
