import { CmsTenant } from '../../../types/tenant';
import { Footer } from './Footer'

type Props = {
    tenant: CmsTenant | null;
}

export const FooterBlock = ({ tenant }: Props) => {

    return (
        <Footer tenant={tenant} />
    )
}
