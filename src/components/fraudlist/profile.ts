import person1 from "./images/person1.svg";
import person2 from "./images/person2.svg";
import person4 from "./images/person4.svg";
import person5 from "./images/person5.svg";
import person6 from "./images/person6.svg";
import person7 from "./images/person7.svg";
import person8 from "./images/person8.svg";
import person9 from "./images/person9.svg";
import person10 from "./images/person10.svg";
import person11 from "./images/person11.svg";
import person12 from "./images/person12.svg";

export const profiles = [
    {
        name: "Joao Mateus",
        status: "Pending",
        image: person1, 
        details: {
            firstName: "Joao",
            lastName: "Mateus",
            fullName:"Joao Mateus",
            bi: "1245557878T",
            height: "1.79 m",
            issuedBI: "Cidade da Matola",
            dateOfBirth: "18/3/1998",
            sex: "Male",
            maritalStatus: "Single",
            fatherName: "Judas Mateus",
            placeOfBirth: "Maputo",
            issuanceDateBI: "18/04/2023",
            motherName: "Luisa Machava",
            address: "P. Combatentes",
            expiryDateBI: "21/10/2026",
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopitxo",
          pep: {
            position: "President",
            period:"2019-now",
            riskCategory:"high",
            country:"Zambezia"
          },
          sanction:"ONU",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "Central"
        }
    },{
        name: "Maria Joana",
        status: "Approved",
        image: person2,
        details: {
            firstName: "Maria",
            lastName: "Joana",
            bi: "123456789",
            height: "1.65 m",
            issuedBI: "Cidade da Beira",
            dateOfBirth: "22/5/1992",
            sex: "Female",
            maritalStatus: "Married",
            fatherName: "Carlos Joana",
            placeOfBirth: "Beira",
            issuanceDateBI: "10/03/2015",
            motherName: "Ana Pereira",
            address: "Av. 24 de Julho",
            expiryDateBI: "10/03/2025",
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
    },
    {
        name: "Carlos Manuel",
        status: "Rejected",
        image: person8,
        details: {
            firstName: "Carlos",
            lastName: "Manuel",
            bi: "987654321",
            height: "1.72 m",
            issuedBI: "Cidade de Nampula",
            dateOfBirth: "5/8/1985",
            sex: "Male",
            maritalStatus: "Divorced",
            fatherName: "Manuel Gomes",
            placeOfBirth: "Nampula",
            issuanceDateBI: "15/09/2010",
            motherName: "Isabel Sousa",
            address: "Rua dos Navegantes",
            expiryDateBI: "15/09/2020",
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
    },{
        name: "Antonio Sousa",
        status: "Pending",
        image: person4,
        details: {
            firstName: "Antonio",
            lastName: "Sousa",
            bi: "1122334455",
            height: "1.68 m",
            issuedBI: "Cidade de Maputo",
            dateOfBirth: "14/12/1990",
            sex: "Male",
            maritalStatus: "Single",
            fatherName: "Sousa Almeida",
            placeOfBirth: "Maputo",
            issuanceDateBI: "12/02/2018",
            motherName: "Carla Mendes",
            address: "Bairro Polana",
            expiryDateBI: "12/02/2028",
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
    },{
        name: "Ana Carla Dias",
        status: "Approved",
        image: person5,
        details: {
          firstName: "Ana Carla",
          lastName: "Dias",
          bi: "87654321MZ",
          height: "1.65 m",
          issuedBI: "Cidade de Maputo",
          dateOfBirth: "12/12/1992",
          sex: "Female",
          maritalStatus: "Married",
          fatherName: "Carlos Dias",
          motherName: "Maria de Lurdes",
          placeOfBirth: "Maputo",
          issuanceDateBI: "02/05/2015",
          expiryDateBI: "02/05/2025",
          address: "Av. 24 de Julho"
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
      },{
        name: "Fernanda Almeida",
        status: "Pending",
        image: person6,
        details: {
          firstName: "Fernanda",
          lastName: "Almeida",
          bi: "45678932MZ",
          height: "1.80 m",
          issuedBI: "Cidade de Beira",
          dateOfBirth: "05/03/1985",
          sex: "Female",
          maritalStatus: "Divorced",
          fatherName: "Alberto Almeida",
          motherName: "Sandra Almeida",
          placeOfBirth: "Beira",
          issuanceDateBI: "10/08/2010",
          expiryDateBI: "10/08/2024",
          address: "Rua da Liberdade"
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
      },{
        name: "Lopes Macamo",
        status: "Rejected",
        image: person7,
        details: {
          firstName: "Lopes",
          lastName: "Macamo",
          bi: "98765432MZ",
          height: "1.70 m",
          issuedBI: "Cidade de Nampula",
          dateOfBirth: "23/08/1990",
          sex: "Male",
          maritalStatus: "Single",
          fatherName: "João Macamo",
          motherName: "Celina Macamo",
          placeOfBirth: "Nampula",
          issuanceDateBI: "14/11/2017",
          expiryDateBI: "14/11/2027",
          address: "Bairro dos Pescadores"
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
      },{
        name: "Miguel António",
        status: "Pending",
        image: person9,
        details: {
          firstName: "Miguel",
          lastName: "António",
          bi: "78901234MZ",
          height: "1.75 m",
          issuedBI: "Cidade de Xai-Xai",
          dateOfBirth: "15/06/1988",
          sex: "Male",
          maritalStatus: "Single",
          fatherName: "Joaquim António",
          motherName: "Sofia António",
          placeOfBirth: "Xai-Xai",
          issuanceDateBI: "22/09/2016",
          expiryDateBI: "22/09/2026",
          address: "Rua das Palmeiras"
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
      },{
        name: "Paula Soares",
        status: "Approved",
        image: person10,
        details: {
          firstName: "Paula",
          lastName: "Soares",
          bi: "23456789MZ",
          height: "1.62 m",
          issuedBI: "Cidade de Tete",
          dateOfBirth: "29/01/1995",
          sex: "Female",
          maritalStatus: "Single",
          fatherName: "Manuel Soares",
          motherName: "Carmem Soares",
          placeOfBirth: "Tete",
          issuanceDateBI: "17/11/2018",
          expiryDateBI: "17/11/2028",
          address: "Bairro Alto Maé"
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
      },{
        name: "Joaquim Alberto",
        status: "Rejected",
        image: person11,
        details: {
          firstName: "Joaquim",
          lastName: "Alberto",
          bi: "34567890MZ",
          height: "1.85 m",
          issuedBI: "Cidade de Nacala",
          dateOfBirth: "11/11/1980",
          sex: "Male",
          maritalStatus: "Married",
          fatherName: "Alberto Ernesto",
          motherName: "Marta Ernesto",
          placeOfBirth: "Nacala",
          issuanceDateBI: "03/03/2012",
          expiryDateBI: "03/03/2022",
          address: "Rua das Acácias"
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
      },{
        name: "Diana Mendes",
        status: "Approved",
        image: person12,
        details: {
          firstName: "Diana",
          lastName: "Mendes",
          bi: "56789012MZ",
          height: "1.68 m",
          issuedBI: "Cidade de Pemba",
          dateOfBirth: "09/09/1993",
          sex: "Female",
          maritalStatus: "Single",
          fatherName: "Eduardo Mendes",
          motherName: "Teresa Mendes",
          placeOfBirth: "Pemba",
          issuanceDateBI: "15/04/2017",
          expiryDateBI: "15/04/2027",
          address: "Avenida Marginal"
        }, 
        screening: {
          entryDate: "16/5/2023",
          name: "Lopes Macamo",
          alias: "Lopito",
          alternativeSpeling:"Lopez",
          ageData: "36 anos",
          DOB: "15/4/1980",
          deceased: "alive",
          details: "not sactioned",
          locations: "o garfo"
        }
      }    
];