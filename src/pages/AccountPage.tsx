import React, { useState, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person,
  Edit,
  Save,
  Cancel,
  ShoppingBag,
  LocationOn,
  CreditCard,
  Security,
  Logout,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { LanguageContext } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    date: '2025-01-15',
    status: 'delivered',
    total: 89.99,
    items: 2
  },
  {
    id: 'ORD-2025-002',
    date: '2025-01-10',
    status: 'shipped',
    total: 129.99,
    items: 1
  },
  {
    id: 'ORD-2025-003',
    date: '2025-01-05',
    status: 'processing',
    total: 199.99,
    items: 3
  }
];

const mockAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    street: '123 Main Street',
    city: 'Tel Aviv',
    state: 'Tel Aviv',
    zipCode: '12345',
    country: 'Israel',
    isDefault: true
  },
  {
    id: '2',
    type: 'work',
    street: '456 Business Ave',
    city: 'Jerusalem',
    state: 'Jerusalem',
    zipCode: '67890',
    country: 'Israel',
    isDefault: false
  }
];

const AccountPage: React.FC = () => {
  const { language, t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+972-50-123-4567',
    dateOfBirth: '1990-01-01'
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedProfile(userProfile);
  };

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'pending': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: Order['status']) => {
    if (language === 'he') {
      switch (status) {
        case 'delivered': return 'נמסר';
        case 'shipped': return 'נשלח';
        case 'processing': return 'בעיבוד';
        case 'pending': return 'ממתין';
        case 'cancelled': return 'בוטל';
        default: return status;
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <Card sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                  <Person sx={{ fontSize: 40 }} />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {t('account.hello')}, {userProfile.firstName}!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {userProfile.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('account.memberSince')} January 2025
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<Logout />}
                  onClick={() => setLogoutDialogOpen(true)}
                  color="error"
                >
                  {t('account.logout')}
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Tabs */}
          <Grid item xs={12}>
            <Paper sx={{ width: '100%' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab 
                  icon={<Person />} 
                  label={t('account.profile')} 
                  iconPosition="start"
                />
                <Tab 
                  icon={<ShoppingBag />} 
                  label={t('account.orders')} 
                  iconPosition="start"
                />
                <Tab 
                  icon={<LocationOn />} 
                  label={t('account.addresses')} 
                  iconPosition="start"
                />
                <Tab 
                  icon={<Security />} 
                  label={t('account.security')} 
                  iconPosition="start"
                />
              </Tabs>

              {/* Profile Tab */}
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5">
                      {language === 'he' ? 'פרטים אישיים' : 'Personal Information'}
                    </Typography>
                    {!isEditing ? (
                      <Button startIcon={<Edit />} onClick={handleEditProfile}>
                        {language === 'he' ? 'ערוך' : 'Edit'}
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button startIcon={<Save />} onClick={handleSaveProfile} variant="contained">
                          {language === 'he' ? 'שמור' : 'Save'}
                        </Button>
                        <Button startIcon={<Cancel />} onClick={handleCancelEdit}>
                          {language === 'he' ? 'בטל' : 'Cancel'}
                        </Button>
                      </Box>
                    )}
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={language === 'he' ? 'שם פרטי' : 'First Name'}
                        value={isEditing ? editedProfile.firstName : userProfile.firstName}
                        onChange={(e) => setEditedProfile({...editedProfile, firstName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={language === 'he' ? 'שם משפחה' : 'Last Name'}
                        value={isEditing ? editedProfile.lastName : userProfile.lastName}
                        onChange={(e) => setEditedProfile({...editedProfile, lastName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={language === 'he' ? 'אימייל' : 'Email'}
                        value={isEditing ? editedProfile.email : userProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                        disabled={!isEditing}
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={language === 'he' ? 'טלפון' : 'Phone'}
                        value={isEditing ? editedProfile.phone : userProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={language === 'he' ? 'תאריך לידה' : 'Date of Birth'}
                        value={isEditing ? editedProfile.dateOfBirth : userProfile.dateOfBirth}
                        onChange={(e) => setEditedProfile({...editedProfile, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                        type="date"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {/* Orders Tab */}
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h5" gutterBottom>
                  {language === 'he' ? 'היסטוריית הזמנות' : 'Order History'}
                </Typography>
                
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{language === 'he' ? 'מספר הזמנה' : 'Order ID'}</TableCell>
                        <TableCell>{language === 'he' ? 'תאריך' : 'Date'}</TableCell>
                        <TableCell>{language === 'he' ? 'סטטוס' : 'Status'}</TableCell>
                        <TableCell>{language === 'he' ? 'פריטים' : 'Items'}</TableCell>
                        <TableCell>{language === 'he' ? 'סה"כ' : 'Total'}</TableCell>
                        <TableCell>{language === 'he' ? 'פעולות' : 'Actions'}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {order.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {new Date(order.date).toLocaleDateString(
                              language === 'he' ? 'he-IL' : 'en-US'
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={getStatusText(order.status)} 
                              color={getStatusColor(order.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>${order.total}</TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined">
                              {language === 'he' ? 'צפה' : 'View'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              {/* Addresses Tab */}
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5">
                    {language === 'he' ? 'כתובות שמורות' : 'Saved Addresses'}
                  </Typography>
                  <Button variant="contained">
                    {language === 'he' ? 'הוסף כתובת' : 'Add Address'}
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  {mockAddresses.map((address) => (
                    <Grid item xs={12} md={6} key={address.id}>
                      <Card variant="outlined" sx={{ p: 2, position: 'relative' }}>
                        {address.isDefault && (
                          <Chip 
                            label={language === 'he' ? 'ברירת מחדל' : 'Default'} 
                            color="primary" 
                            size="small"
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                          />
                        )}
                        <Typography variant="h6" gutterBottom>
                          {language === 'he' ? 
                            (address.type === 'home' ? 'בית' : address.type === 'work' ? 'עבודה' : 'אחר') :
                            address.type.charAt(0).toUpperCase() + address.type.slice(1)
                          }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {address.street}<br />
                          {address.city}, {address.state} {address.zipCode}<br />
                          {address.country}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                          <Button size="small" variant="outlined">
                            {language === 'he' ? 'ערוך' : 'Edit'}
                          </Button>
                          <Button size="small" variant="outlined" color="error">
                            {language === 'he' ? 'מחק' : 'Delete'}
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Security Tab */}
              <TabPanel value={tabValue} index={3}>
                <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                  <Typography variant="h5" gutterBottom>
                    {language === 'he' ? 'אבטחה וסיסמה' : 'Security & Password'}
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 3 }}>
                    {language === 'he' 
                      ? 'לאבטחה מירבית, מומלץ לשנות את הסיסמה מעת לעת'
                      : 'For maximum security, we recommend changing your password regularly'
                    }
                  </Alert>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={language === 'he' ? 'סיסמה נוכחית' : 'Current Password'}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() => setShowPassword(!showPassword)}
                              sx={{ minWidth: 'auto', p: 1 }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </Button>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={language === 'he' ? 'סיסמה חדשה' : 'New Password'}
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={language === 'he' ? 'אשר סיסמה חדשה' : 'Confirm New Password'}
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" startIcon={<Security />}>
                        {language === 'he' ? 'עדכן סיסמה' : 'Update Password'}
                      </Button>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 4 }} />

                  <Typography variant="h6" gutterBottom>
                    {language === 'he' ? 'אימות דו-שלבי' : 'Two-Factor Authentication'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {language === 'he' 
                      ? 'הוסף שכבת אבטחה נוספת לחשבון שלך'
                      : 'Add an extra layer of security to your account'
                    }
                  </Typography>
                  <Button variant="outlined">
                    {language === 'he' ? 'הפעל אימות דו-שלבי' : 'Enable Two-Factor Auth'}
                  </Button>
                </Box>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>
          {language === 'he' ? 'אישור התנתקות' : 'Confirm Logout'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {language === 'he' 
              ? 'האם אתה בטוח שברצונך להתנתק?'
              : 'Are you sure you want to logout?'
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>
            {language === 'he' ? 'בטל' : 'Cancel'}
          </Button>
          <Button onClick={() => navigate('/')} color="error" variant="contained">
            {language === 'he' ? 'התנתק' : 'Logout'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountPage;