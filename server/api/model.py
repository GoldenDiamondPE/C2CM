from data import Jobs #import the Jobs class from data.py

def generate_report(jobs: list[Jobs]):
    report_list = ["Your jobs are"]
    for job in jobs:
        report_list.append(
            f"\t* Job Title: {job.title}"
        )
    report = "\n".join(report_list)
    return report
