import  { OrganizationList } from "@clerk/nextjs";

export default function createOrganizationPage () {
    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl="/organization/:id"
            afterCreateOrganizationUrl="/organization/:id"
        />
    )
}