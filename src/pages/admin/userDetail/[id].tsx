'use client';

import { useParams } from 'next/navigation';
import UserDetails from "../../../../components/Admin/User-Detail/UserDetails";

const Users = () => {
    const params = useParams();

    if (!params || !params.id) {
        return <p>Loading...</p>; // Handle case where params is null or id is missing
    }

    // Ensure userId is always a string
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;

    return (
        <div>
            <UserDetails userId={userId} />
        </div>
    );
}

export default Users;
