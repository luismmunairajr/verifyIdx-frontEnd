import invoiceicon from "@/assets/invoice.svg";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/components/language/language-provider";

const invoices = [
    { id: 1, amount: "+10.00", description: "Lorem ipsum dolor sit amet", status: "Pending", date: "20 dec 2017 14:54" },
    { id: 2, amount: "+25.50", description: "Lorem ipsum dolor sit amet", status: "Canceled", date: "15 jan 2018 10:30" },
    { id: 3, amount: "+30.00", description: "Consectetur adipiscing elit", status: "Pending", date: "5 feb 2019 09:15" },
    { id: 4, amount: "+10.00", description: "Lorem ipsum dolor sit amet", status: "Not paid yet", date: "20 dec 2017 14:54" },
    { id: 5, amount: "+25.50", description: "Lorem ipsum dolor sit amet", status: "Received", date: "15 jan 2018 10:30" },
    { id: 6, amount: "+30.00", description: "Consectetur adipiscing elit", status: "Received", date: "5 feb 2019 09:15" },
];

export default function Invoice() {
    const { t } = useLanguage();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{t("invoice")}</TableHead>
                    <TableHead>{t("amount")}</TableHead>
                    <TableHead>{t("description")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>
                            <Image src={invoiceicon} alt="Invoice Icon" width={24} height={24} />
                        </TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
