# MicroManage

This project is a micro frontend application generated with Angular version 17.0.7 consisting of three separate apps:

- Shell (Host)
- Admin (Remote)
- Dashboard (Remote)

## Applications
#### Shell (Host)

- Acts as the main container for the micro frontends.
- Runs on http://localhost:4200/

#### Admin (Remote)

- A remote micro frontend providing administrative functionalities CRUD data.
- Runs on http://localhost:4202/

#### Dashboard (Remote)

- A remote micro frontend providing dashboard functionalities display chart.
- Runs on http://localhost:4201/

## Running the Applications
To run the applications locally, you will need to start each one individually.
`ng serve dashboard`
`ng serve admin`
`ng serve shell`

## Usage
Once all applications are running, you can navigate to the Shell application at http://localhost:4200/. The Shell will dynamically load the Dashboard and Admin micro frontends as needed.
