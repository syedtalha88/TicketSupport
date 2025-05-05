# API Routes

## **Auth**
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile

## **User Tickets**
- `POST /api/tickets` - Create ticket
- `GET /api/tickets/my` - Get user tickets
- `GET /api/tickets/:ticketId` - Get ticket
- `PATCH /api/tickets/:ticketId` - Update ticket

## **Replies**
- `POST /api/tickets/:ticketId/replies` - Add reply
- `GET /api/tickets/:ticketId/replies` - Get replies

## **AI Reply (Admin Only)**
- `POST /api/tickets/:ticketId/ai-reply` - AI suggestion

## **Admin**
- `GET /api/admin/tickets` - Get all tickets
- `PATCH /api/admin/tickets/:ticketId/status` - Update ticket status
- `GET /api/admin/users` - List users
- `GET /api/admin/users/:userId/tickets` - User's tickets
