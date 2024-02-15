import { Loader } from "@mantine/core";

export const Loading = ({height}: {height: string}) => {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height
    }}>
        <Loader color="blue" />
    </div>;
};