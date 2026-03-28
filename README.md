# Home Warranty Dashboard

An admin dashboard for managing home appliance warranty service requests. Built with Angular Material, it pulls requests from a .NET backend on Azure and lets admins search for nearby service vendors via the Yelp API to assign them to open requests.

This was built as part of an IoT-based home warranty system. The dashboard is the admin-facing piece where warranty claims come in, and someone assigns a local repair vendor to handle them.

## What it does

- **Service request table** — Paginated, sortable Material table showing all incoming warranty requests. Each row has consumer name (with avatar), appliance name, appointment time, and an assign button.
- **Search & filter** — Real-time filtering across request ID, consumer name, appliance, and appointment date.
- **Yelp vendor search** — Click "Assign" on a request, a dialog opens with a radius slider. Searches Yelp for repair vendors near the consumer's location, shows name, rating, phone, address.
- **Assign vendor** — Select a vendor from results, backend records the assignment (vendor name, location, contact number).
- **Request details** — Click the edit icon on any appliance to see the service images and description in a gallery dialog.

## Tech Stack

- **Angular 8** with TypeScript
- **Angular Material** — Table, Dialog, Toolbar, Paginator, Sort, Slider, Icons, Cards
- **RxJS** — BehaviorSubject for reactive data flow
- **Yelp Fusion API** — Vendor search by location + radius + appliance type
- **Azure backend** — .NET API at `iot-based-home-warranty.azurewebsites.net`

## Project Structure

```
src/app/
├── app.component.*          # Main view — Material table with filter, sort, pagination
├── models/
│   └── issue.ts             # Data models: ServiceRequest, Consumer, Appliance, YelpResponse
├── services/
│   └── data.service.ts      # HTTP calls to Azure backend + Yelp proxy
└── dialogs/
    ├── add/                 # Yelp vendor search dialog (radius slider + results)
    ├── edit/                # Request detail dialog (image gallery)
    └── delete/              # Assignment success confirmation
```

## API Endpoints (Azure Backend)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/ConsumerRequest/getallrequests` | Fetch all service requests |
| POST | `/api/ConsumerRequest/GetYelpResponse` | Search Yelp for vendors by lat/long/radius |
| POST | `/api/ConsumerRequest/AssignService` | Assign a vendor to a request |

## How It Works

```
1. Dashboard loads → GET all service requests → render in Material table
2. Admin clicks "Assign" on a request
3. Dialog opens → slider sets search radius → POST to Yelp proxy
4. Yelp results shown (vendor name, rating, phone, distance)
5. Admin clicks "Book" on a vendor → POST assign to backend
6. Success confirmation dialog
```

## Running Locally

```bash
npm install
npm start          # http://localhost:4200
```

Requires the Azure backend to be running for API calls to work.

## Note

This was built in 2019 as part of a larger IoT-based home warranty system (the consumer-facing mobile app submitted requests, this dashboard managed them). Angular 8 is outdated but the patterns — Material DataSource, reactive data with BehaviorSubject, dialog-based workflows, third-party API integration — demonstrate the concepts well.
