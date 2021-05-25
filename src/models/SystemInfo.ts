export interface SystemInfo {
	isLoading?: boolean
	CPUH?: number
	CPUName?: string
	ClusterInfo?: ClusterInfo
	IP?: string
	MMInfo?: string
	MoneyCount?: string
	OPQVersion?: string
	OS?: string
	OSSName?: string
	Plugins?: number
	QQUsersCounts?: number
	RunTime?: string
	SystemUsage?: SystemUsage
	TotalMoney?: string
	UPtime?: string
}

export interface ClusterInfo {
	Alloc?: string
	CpuNum?: number
	FreesTimes?: number
	GCTime?: string
	GoArch?: string
	GoVersion?: string
	GoroutineNum: number
	LastGCTime?: string
	MallocsTimes?: number
	NextGC?: string
	Platform?: string
	ServerRuntime?: string
	Sys?: string
	TotalAlloc?: string
}

export interface SystemUsage {
	data?: string
	CpuUsage: string
	MemUsage: string
	NetReceive: number
	NetSend: number
}
