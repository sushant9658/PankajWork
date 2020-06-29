const response = {
    "soapenv:Envelope": {
        "_attributes": {
            "xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/"
        },
        "soapenv:Body": {
            "ns2:BalInqRs": {
                "_attributes": {
                    "xmlns:ns2": "http://schema.cmo.anz/BalInq"
                },
                "Status": {
                    "StatusCode": {
                        "_text": "0"
                    },
                    "Severity": {
                        "_text": "Info"
                    },
                    "StatusDesc": {
                        "_text": "Success"
                    }
                },
                "RqUID": {
                    "_text": "8f80c5216acd433984c38c3a697837b5"
                },
                "BalRec": []
            }
        }
    }
};

const balRecForFound = {
    "BalInfo": {
        "AcctRef": {
            "AcctInfo": {
                "CurCode": {
                    "Value": {
                        "_text": "VND"
                    }
                },
                "AcctIdent": [{
                        "AcctIdentType": {
                            "_text": "AcctId"
                        },
                        "AcctIdentValue": {
                            "_text": "841688284"
                        }
                    },
                    {
                        "AcctIdentType": {
                            "_text": "AcctSys"
                        },
                        "AcctIdentValue": {
                            "_text": "INT"
                        }
                    }
                ],
                "FIData": {
                    "FIIdentType": {
                        "_text": "SWIFT"
                    },
                    "FIIdent": {
                        "_text": "ANZBVNV0XXX"
                    },
                    "Country": {
                        "_text": "VN"
                    }
                }
            }
        },
        "IncExtBal": {
            "_text": "0"
        },
        "AcctBal": [{
                "BalType": {
                    "_text": "Current"
                },
                "CurAmt": {
                    "Amt": {
                        "_text": "10000000"
                    }
                },
                "EffDt": {
                    "_text": "2017-08-21T21:10:48.397+10:00"
                }
            },
            {
                "BalType": {
                    "_text": "Avail"
                },
                "CurAmt": {
                    "Amt": {
                        "_text": "15000000"
                    }
                },
                "EffDt": {
                    "_text": "2017-08-21T21:10:48.397+10:00"
                }
            },
            {
                "BalType": {
                    "_text": "CreditLimit"
                },
                "CurAmt": {
                    "Amt": {
                        "_text": "10000000"
                    }
                },
                "EffDt": {
                    "_text": "2017-08-21T21:10:48.397+10:00"
                }
            },
            {
                "BalType": {
                    "_text": "Ledger"
                },
                "CurAmt": {
                    "Amt": {
                        "_text": "10000000"
                    }
                },
                "EffDt": {
                    "_text": "2017-08-21T21:10:48.397+10:00"
                }
            },
            {
                "BalType": {
                    "_text": "OpeningAvail"
                },
                "CurAmt": {
                    "Amt": {
                        "_text": "10000000"
                    }
                },
                "EffDt": {
                    "_text": "2017-08-21T21:10:48.397+10:00"
                }
            },
            {
                "BalType": {
                    "_text": "IntBal"
                },
                "CurAmt": {
                    "Amt": {
                        "_text": "10000000"
                    }
                },
                "EffDt": {
                    "_text": "2017-08-21T21:10:48.397+10:00"
                }
            },
            {
                "BalType": {
                    "_text": "AvailableFund"
                },
                "CurAmt": {
                    "Amt": {
                        "_text": "10000000"
                    }
                },
                "EffDt": {
                    "_text": "2017-08-21T21:10:48.397+10:00"
                }
            }
        ]
    },
    "BalStatus": {
        "BalStatusCode": {
            "_text": "valid"
        }
    },
    "AcctStatus": {
        "AcctStatusCode": {
            "_text": "Open"
        }
    }
};

const balRecForNotFound = {
    "BalInfo": {
        "AcctRef": {
            "AcctInfo": {
                "CurCode": {
                    "Value": {
                        "_text": "VND"
                    }
                },
                "AcctIdent": [{
                        "AcctIdentType": {
                            "_text": "AcctId"
                        },
                        "AcctIdentValue": {
                            "_text": "841688284"
                        }
                    },
                    {
                        "AcctIdentType": {
                            "_text": "AcctSys"
                        },
                        "AcctIdentValue": {
                            "_text": "INT"
                        }
                    }
                ],
                "FIData": {
                    "FIIdentType": {
                        "_text": "SWIFT"
                    },
                    "FIIdent": {
                        "_text": "ANZBVNV0XXX"
                    },
                    "Country": {
                        "_text": "VN"
                    }
                }
            }
        },
        "IncExtBal": {
            "_text": "0"
        }
    },
    "BalStatus": {
        "BalStatusCode": {
            "_text": "NotAvail"
        }
    },
    "AcctStatus": {
        "AcctStatusCode": {
            "_text": "Closed"
        }
    }
};

module.exports = {
    response,
    balRecForFound,
    balRecForNotFound
}