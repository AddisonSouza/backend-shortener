export class DataUtil {
    static timestampNow(): Date {
        // Get current date/time in São Paulo timezone (America/Sao_Paulo - UTC-3)
        const saoPauloTime = new Date().toLocaleString('en-US', {
            timeZone: 'America/Sao_Paulo'
        });
        
        // Convert back to Date object
        return new Date(saoPauloTime);
    }

}